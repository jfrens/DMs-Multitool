import webapp2
import jinja2

from jinja2 import Environment, PackageLoader
jinja2_env = Environment(loader=PackageLoader('d20multitool', 'html'))

class MainPage (webapp2.RequestHandler):
	def get(self):
		self.response.headers['Content-Type'] = 'text/plain'
		self.response.write('Hello, World!')

class DicePage (webapp2.RequestHandler):
	def get(self):
		template = jinja2_env.get_template('dice.html')
		self.response.out.write(template.render())
		
		
application = webapp2.WSGIApplication([
	('/', MainPage),
	('/dice', DicePage),
], debug=True)
