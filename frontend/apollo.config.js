module.exports = {
  client: {},
};

// APOLLO_KEY=service:ecommerce-m363zp:VWbMLHks_zdFT3CbtzqADg
// APOLLO_SCHEMA_REPORTING=true

// ## Apollo CLI ##
// # automatically outputs to schema.graphql
// # can ONLY output introspection results in JSON
// apollo service:download --endpoint http://localhost:4000/api/graphql ./lib/graphql/generated/schema.graphqls",

// ## Rover ##
// # automatically outputs to stdout. Can redirect to schema.graphql
// # can ONLY output SDL
// rover graph introspect http://localhost:4000/api/graphql
