#Returns a list of unique words extracted from Product description
import json
import nltk.corpus
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

class UniqueNounsExtractor:
	stopwords = set(nltk.corpus.stopwords.words('english'))
	
	def __init__(self,fileName):
		self.fileName = fileName
		self.uniqueNouns = []

	def extractUniqueWords(self):
		print "Processing " + self.fileName
		with open(self.fileName) as fp:
			self.products = json.load(fp)

		for product in self.products:
			dl = product['description']
			description = " ".join(dl).lower().replace(',','').rstrip()
			tokens = word_tokenize(description)
			relevantWords = [word for word in tokens if word not in self.stopwords]
			for word, tag in pos_tag(relevantWords):
				if word not in self.uniqueNouns:
					if (tag == 'NN' or tag == 'NNP' or tag == 'NNS' or tag == 'NNPS'):
						self.uniqueNouns.append(word)

		return self.uniqueNouns

