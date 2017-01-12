const express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require('massive'),
    passport = require('passport'),
    GithubStrategy = require('passport-github2'),
    cors = require('cors'),
    config = require('./config.js')

let app = express();
