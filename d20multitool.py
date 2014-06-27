import webapp2
import jinja2
from google.appengine.api import urlfetch

from jinja2 import Environment, PackageLoader
jinja2_env = Environment(loader=PackageLoader('d20multitool', 'html'))

class MainPage (webapp2.RequestHandler):
	def get(self):
		template = jinja2_env.get_template('index.html')
		self.response.out.write(template.render())

class DicePage (webapp2.RequestHandler):
	def get(self):
		template = jinja2_env.get_template('dice.html')
		self.response.out.write(template.render())
		
class bestiaryPage (webapp2.RequestHandler):
	def get(self):
		template = jinja2_env.get_template('bestiary.html')
		self.response.out.write(template.render())
		
class bestiaryProxy (webapp2.RequestHandler):
	def get(self):
		str = self.request.url
		prefix="http://www.d20pfsrd.com/"
		urlstring=str.replace(self.request.host_url, prefix) 
		response = urlfetch.fetch(urlstring, method=urlfetch.GET)
		self.response.out.write(response.content);
		
application = webapp2.WSGIApplication([
	('/', MainPage),
	('/dice', DicePage),
	('/bestiary', bestiaryPage),
	('/bestiary/monster-listings/.*', bestiaryProxy),
], debug=True)
