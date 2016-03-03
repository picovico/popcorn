import SimpleHTTPServer, SocketServer
import urlparse, os

PORT = 3333

class MyHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
   def do_GET(self):

       # Parse query data to find out what was requested
       parsedParams = urlparse.urlparse(self.path)

       # See if the file requested exists
       if os.access('.' + os.sep + parsedParams.path, os.R_OK):
          # File exists, serve it up
          SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self);
       else:
          # redirect to index.html
          self.send_response(302)
          self.send_header('Content-Type', 'text/html')  
          self.send_header('location', '/')  
          self.end_headers()

Handler = MyHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
