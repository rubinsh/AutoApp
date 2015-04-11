class HomeController < ApplicationController
  respond_to :json, :html
  HOST = 'http://mpilot.auto.co.il/autoAPI.svc'

  def api
    p request.fullpath
    #binding.pry
    respond_with Net::HTTP.get URI.parse(HOST + request.env["REQUEST_URI"])
  end

  def index
     respond_to do |format|

        format.html {

        }

        format.json{
            render json: [
              { name: 'קטלוג הרכב', img: '......', route: '.......'},
              { name: 'כתבות', img: '......', route: '.......'},
              { name: 'מדריך קניה', img: '......', route: '.......'},
              { name: 'יייעוץ חינם לקניית רכב', img: '......', route: '.......'},
              { name: 'מועדפים', img: '......', route: '.......'}]
        }


     end

  end

end
