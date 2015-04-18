#spider to crawl ebay.com
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from crawler.items import Product

class EbaySpider(CrawlSpider):
	name = "ebay"
	allowed_domains = ["ebay.com"]
	start_urls = []
	rules = [Rule(LinkExtractor(allow=['/itm/.+']),'parse_product')]

	def parse_product(self,response):
		product = Product()
		product['name'] = response.xpath("//h1[@id='itemTitle']/text()").extract()
		product['description'] = response.xpath("//div[@class='prodDetailSec']//text()").extract()
		return product

	def __init__(self, cid=None, cname=None, *args, **kwargs):
		super(EbaySpider, self).__init__(*args, **kwargs)
		self.start_urls.append("http://www.ebay.com/sch/%s-/%s/i.html" % (cname,cid))
