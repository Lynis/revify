import sys
import numpy
import nltk.corpus
import nltk.stem
import itertools

from nltk.cluster import KMeansClusterer, GAAClusterer, euclidean_distance
from nltk.corpus import wordnet as wn
from nltk import decorators
from nltk.stem.wordnet import WordNetLemmatizer
from time import strftime

stemmer_func = nltk.stem.snowball.EnglishStemmer().stem
stopwords = set(nltk.corpus.stopwords.words('english'))

@decorators.memoize
def normalize_word(word):
    return stemmer_func(word)

def get_words(titles):
    words = set()
    for title in job_titles:
        for word in title.split():
            words.add(normalize_word(word))
    print words
    return list(words)

def max_wup_similiarity_score(word1,word2):
	if word1 is word2:
		return 1

	equivalence = WordNetLemmatizer()
	word1 = equivalence.lemmatize(word1)
	word2 = equivalence.lemmatize(word2)
	
	word1_synonyms = wn.synsets(word1)
	word2_synonyms = wn.synsets(word2)
	
	scores = [i.wup_similarity(j) for i, j in list(itertools.product(word1_synonyms, word2_synonyms))]
	
	if len(scores) > 0:
		max_ =  max(scores)
		if max_ is not None:
			return max_
	return 0


def vectorspaced(words, word):
	#s = wn.synset(word + '.n.01')
	y = numpy.array([max_wup_similiarity_score(word,x) for x in words],numpy.float)
	return y

if __name__ == '__main__':

    filename = 'unique-nouns-extractor-output\cameras.txt'
    if len(sys.argv) == 2:
        filename = sys.argv[1]

    with open(filename) as product_file:
    	print 'Starting clustering at - ' + strftime("%Y-%m-%d %H:%M:%S")

        nouns = [word.decode('utf-8') for word in product_file.readline().split(' ')]
        
        #stemmed = [normalize_word(word) for word in nouns]
        clusterer = KMeansClusterer(8, euclidean_distance) #GAAClusterer(5)
        vectors = [vectorspaced(nouns, word) for word in nouns]
        
        clusters = clusterer.cluster(vectors,True)
        
        print "Done clustering at - " + strftime("%Y-%m-%d %H:%M:%S")
        print "clusters:" + str(clusters)
        #print "means:" + str(clusterer.means())

        sorted_and_zipped = sorted(zip(clusters, nouns))
        with open("clustered.txt") as o:
        	o.write(filename)
        	o.write(sorted_and_zipped)
        	o.close()