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

async function run () {
  // Let's start by indexing some data
  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Ned Stark',
      quote: 'Winter is coming.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Daenerys Targaryen',
      quote: 'I am the blood of the dragon.'
    }
  })

  await client.index({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      character: 'Tyrion Lannister',
      quote: 'A mind needs books like a sword needs a whetstone.'
    }
  })

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await client.indices.refresh({ index: 'game-of-thrones' })

  // Let's search!
  const { body } = await client.search({
    index: 'game-of-thrones',
    // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
    body: {
      query: {
        match: { quote: 'winter' }
      }
    }
  })

  console.log(body.hits.hits)

  var response = await client.indices.delete({
    index: 'game-of-thrones'
})

console.log('Deleting index:')
console.log(response.body)
}

run().catch(console.log)