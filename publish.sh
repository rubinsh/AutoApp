rm -Rf auto-mobile.herokuapp.com
wget --page-requisites --convert-links http://auto-mobile.herokuapp.com
wget --page-requisites --convert-links http://auto-mobile.herokuapp.com/banner.html
wget --page-requisites --convert-links http://auto-mobile.herokuapp.com/consulting.html
wget --page-requisites --convert-links http://auto-mobile.herokuapp.com/maavron.html
# replace the autoApiPrefix variable value
sed -i '/autoApiPrefix/ { c \
     var autoApiPrefix = "autoapi.svc/";
}' ./auto-mobile.herokuapp.com/index.html

