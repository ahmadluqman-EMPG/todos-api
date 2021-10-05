'use strict'
const fs = require('fs');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'https://localhost:9200', auth: {
    username: 'admin',
    password: 'admin'
  },
  ssl: {
    ca: fs.readFileSync('/Users/ahmadluqman/.ssh/aluqman-poc-kp.pem'),
    rejectUnauthorized: false
  }
})
const todo_index_name = 'todo-index'

exports.createIndex = async (doc) => {
  await client.index({
    index: todo_index_name,
    body: doc
  })
};
