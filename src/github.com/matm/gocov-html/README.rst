Gocov HTML export
=================

This is a simple helper tool for generating HTML output from `axw/gocov`_.

.. _axw/gocov: https://github.com/axw/gocov

Here is a screenshot:

.. image:: https://dl.dropboxusercontent.com/u/37900935/Screens/coverage.png
   :scale: 40 %
   :alt: HTML coverage report screenshot
   :align: center


Installation
------------

Just type the following to install the program and its dependencies::

    $ go get github.com/axw/gocov/gocov
    $ go get gopkg.in/matm/v1/gocov-html

Usage
-----

`gocov-html` can read a JSON file or read from standard input::

    $ gocov test net/http | gocov-html > http.html

or::

    $ gocov test net/http > http.json
    $ gocov-html http.json > http.html

The generated HTML content comes along with a default embedded CSS. Use the `-s` 
flag to use a custom stylesheet::

    $ gocov test net/http | gocov-html -s mystyle.css > http.html
