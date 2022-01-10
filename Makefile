BLD = build
DIST = dist

.PHONY: clean init build dist

default: clean init build dist

init:
	virtualenv .venv && . .venv/bin/activate && pip install -r requirements.txt && deactivate
	
clean:
	rm -rf .venv $(BLD) $(DIST)
	
build:
	-mkdir build
	. .venv/bin/activate && htmlark html/index.html > $(BLD)/index.html

test:
	docker-compose up -d
	
dist:
	-mkdir dist
	cp $(BLD)/index.html $(DIST)/index.html 
	cp config/config.json $(DIST)/ 
	cp config/metadata.json $(DIST)/ 
	cp config/256x256.png $(DIST)/
	cp html/images/* $(DIST)/
	
