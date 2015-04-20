from extractor import UniqueNounsExtractor
import os

directory = "crawled-output"
uniqueNounsDirectory = "unique-nouns-extractor-output"
#os.mkdir(uniqueNounsDirectory)
for fileName in os.listdir(directory):
	product = UniqueNounsExtractor(os.path.join(directory,fileName))
	uniqueWords = product.extractUniqueWords()
	fileName = fileName.split('.')[0] + '.txt';
	fp = open(os.path.join(uniqueNounsDirectory,fileName), "w+")
	fp.write(" ".join(uniqueWords).encode('utf-8').strip('[]'))
	fp.close()
