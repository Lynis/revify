#spider to crawl ebay.com
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors import LinkExtractor
from crawler.items import Product

class WalmartSpider(CrawlSpider):
	name = "walmart"
	allowed_domains = ["walmart.com"]
	start_urls = []
	rules = [Rule(LinkExtractor(allow=['/ip/.+']),'parse_product')]

	def parse_product(self,response):
		product = Product()
		product['name'] = response.xpath("//h1[@class='heading-b product-name product-heading js-product-heading']/text()").extract()
		product['description'] = response.xpath("//div[@class='js-ellipsis module']//li//text()").extract()
		return product

	def __init__(self, cid=None, *args, **kwargs):
		super(WalmartSpider, self).__init__(*args, **kwargs)
		self.start_urls.append("http://www.walmart.com/cp/%s" % (cid))
