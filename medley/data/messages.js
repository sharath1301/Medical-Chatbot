import React from 'react'

module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: `Hi, I'm medley, your personal medical assistant. What can I help you with?`,
    createdAt: new Date(),
    user: {
      _id: 1,
      name: 'medley',
      avatar: require('../assets/images/medley-logo-square.png')
    },
    sent: true,
    received: true,
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: "This is Medley, your personal medical assistant.",
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    system: true,
  },
];
