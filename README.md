# ~~Ember Ordr: An Ember.js demo~~
# Angular Ordr: An AngularJS demo

A simple restaurant's order management demo app:

- That lets one manage a tab of orders made at each table in the restaurant.
- A list of tables is on the left. When a table is selected, display the list of food items and an order menu of items ordered
- Allow adding food items to the order menu. Show the cost of each added item and the total.

Live Demo: [in Angular](https://dl.dropbox.com/u/229718/angular-ordr/index.html) and [in Ember](https://dl.dropbox.com/u/229718/ember-ordr/index.html) ([diff](https://github.com/harleyttd/angular-ordr/commit/0b93f678776867b8e7a1e97c8050ea66113f3ede))


## Rewrite notes

I bought [Peepcode](http://www.peepcode.com)'s [latest one on Ember.js](https://peepcode.com/products/emberjs) and completed the demo Ember app. The screencast was very well done and based on my findings, I think it's the best source to get started with Ember.js at the moment.

As I'm evaluating Ember.js vs AngularJS to use for a project (with Rails backend), I'm rewriting the app in AngularJS so as to compare them. This is based on the original idea by @IgorMinar who rewrote Peepcode's Music Player Backbone.js app into AngularJS: https://github.com/angular/peepcode-tunes

I swapped out Ember.js framework files with AngularJS files first (to reduce noise), then did the whole conversion in a single commit [here](https://github.com/harleyttd/angular-ordr/commit/0b93f678776867b8e7a1e97c8050ea66113f3ede).

I have a few limited personal observations and opinions below. Being new to both frameworks, I'll appreciate any corrections or comments.

### Ember.js:

- Pros:
	- Support for relationship between models
	- Better support for RESTful resources
	- Better support for nested controllers
	- Better layout support  with {{ outlet }}, {{ partial "something" }} and {{ render "something" }}
	- Handlebar templates are string templates and independent on DOM parsing

- Cons:
	- Verbose templating. Having too many `<script type="text/x-handlebars"` on a single page isn't fun to maintain

### AngularJS:

- Pros:
	- Don't have to worry about binding via set/get. Dirty checking FTW
	- HTML is much more concise and easier to read in the editor with ng-repeat than with handlebar syntax
	- Haven't written tests for this but it does feel that it would be easier to write (also thanks to great test documentation)

- Cons:
	- Awkward layout structure with ng-view and ng-include
	- Awkward support for nesting controllers


I end up preferring AngularJS for its great documentation, concise syntax and great binding support. My main concern with Angular is I find Ember and Backbone's Model-centric style more intuitive. I still don't know how to have a Model-like encapsulation in Angular. Is there any good way to have model relationships (HasMany/BelongsTo) like Ember does? The ugliest code in this ember-to-angular conversion was to handle the loading of records of different "models". I took a quick look at "angular-resource" but it didn't seem to help for this example. Admittedly, the input (via FIXTURES) that Peepcode came up with was for Ember.js, so naturally it's easier to parse with Ember.js.


## Usage:

Run:
	
	bin/server

Then visit http://localhost:3000
There's also a live demo hosted [here](https://dl.dropbox.com/u/229718/angular-ordr/index.html)

## (Bonus) REST backend

@xinsight implemented a RESTful backend over at https://github.com/xinsight/angular-ordr/tree/rest-backend if you are interested. Notes below are from his branch:

The original angular-ordr had a lot of code to manage the client-side-only data structure. I was curious how the angular code would look with a proper backend, so I created one using Restify and node.js.

To start the REST server:

    npm install -g restify
    node server/server.js

Supported REST URLs:

    # view tables
    curl -i http://localhost:3001/tables
    # view details for a table (tab items)
    curl -i http://localhost:3001/tables/1
    # view foods
    curl -i http://localhost:3001/foods
    # add food item 3 to table 1  (POST)
    curl -d "" -i http://localhost:3001/tables/1/foods/3
    # remove food item from table
    curl -X DELETE -i http://localhost:3001/tables/1/tabitem/100

Access to the REST server is contained in a service, which is used by the various controllers. The only part that seemed crufty was having to use the $rootScope to store the table details, so that they could be accessed by two controllers. (One controller adds elements to the tab, and another removes elements. When they used $scope, they interface would occasionally ignore adds and deletes.)

Two important omissions in this demo: unit testing and robust handling of network errors.

## License:

All my code as well as AngularJS are licensed under the [MIT license].
I already asked Peepcode and was approved to use the Ember.js code to convert into AngularJS
