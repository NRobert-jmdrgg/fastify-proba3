const {
  getItem,
  getItems,
  addItem,
  deleteItem,
} = require('../controllers/items.controller');

// item schema
const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

// options for get all items
// format output
const getItemsOps = {
  schema: {
    response: {
      // ok
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItems,
};

const getItemOps = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

const postItemOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const deleteItemOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    },
  },
  handler: deleteItem,
};

function itemRoutes(fastify, options, done) {
  // route one get all items
  fastify.get('/items', getItemsOps);

  // route two
  // get one item by given id
  fastify.get('/items/:id', getItemOps);

  // add item

  fastify.post('/items', postItemOpts);

  // delete item
  fastify.delete('items/:id', deleteItemOpts);

  done();
}

module.exports = itemRoutes;
