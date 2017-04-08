const ENV = typeof window !== 'undefined' ? window.__NEXT_DATA__.env : process.env

// ENV variables exported here are sent to the client via pages/_document.js

exports.API_BASE_URL = ENV.API_BASE_URL || 'https://api.satellit.in'
exports.API_AUTHORIZATION_HEADER = ENV.API_AUTHORIZATION_HEADER

exports.PUBLIC_BASE_URL = ENV.PUBLIC_BASE_URL

exports.STRIPE_PUBLISHABLE_KEY = ENV.STRIPE_PUBLISHABLE_KEY

exports.PF_PSPID = ENV.PF_PSPID
exports.PF_INPUT_SECRET = ENV.PF_INPUT_SECRET
exports.PF_FORM_ACTION = ENV.PF_FORM_ACTION
