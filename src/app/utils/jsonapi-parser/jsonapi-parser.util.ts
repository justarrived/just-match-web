import * as _ from 'lodash';
import {Response} from '@angular/http';

export function parseJsonapiResponse(response: Response): any {
  let body = response.json();
  return deserializeBody(body);
}

function deserializeBody(body: any): any {
  if (!body) {
    return body;
  }

  let data = body.data;

  if (_.isArray(data)) {
    data = map(data, record => {
      record.attributes = record.attributes || {};
      return getDeserializedRecordWithPopulatedFields(record, body.included);
    });
  } else if (_.isObject(data)) {
    data.attributes = data.attributes || {};
    data = getDeserializedRecordWithPopulatedFields(data, body.included);
  }

  let result: any = {
    data: data
  };

  if (body.links) {
    result.links = body.links;
  }

  if (body.meta) {
    result.meta = body.meta;
  }

  return result;
}

function getDeserializedRecordWithPopulatedFields(record: any, included: any, parents?: any): any {
  populateIncludedFields(record, included, parents);
  return getDeserializedRecord(record);
}

function populateIncludedFields(record: any, included: any, parents?: any): void {
  if (record.relationships) {
    parents = parents ? parents.concat([record]) : [record];
  }

  each(record.relationships, (relationship: any, property: any) => {
    if (_.isArray(relationship.data)) {
      record.attributes[property] = map(relationship.data, data => findIncludedRelationship(data, included, parents));
    } else {
      record.attributes[property] = findIncludedRelationship(relationship.data, included, parents);
    }
  });
}

function findIncludedRelationship(relationship: any, included: any, parents: any): any {
  let circularRelationship = _.find(parents, relationship);
  if (circularRelationship) {
    return relationship;
  }

  let result = _.find(included, relationship);
  if (!result) {
    return relationship;
  }

  return getDeserializedRecordWithPopulatedFields(result, included, parents);
}

function getDeserializedRecord(record: any): any {
  let result: any = {
    id: record.id
  };

  if (record.links) {
    result.links = record.links;
  }

  return _.assignIn(result, record.attributes);
}

function each(collection: any, iterator: Function): void {
  if (!collection) {
    return;
  }

  let keys: any = _.isArray(collection) ? _.range(collection.length) : Object.keys(collection);
  _.forEach(keys, key => iterator(collection[key], key));
}

function map(collection: any, iterator: Function): any {
  let result = [];
  each(collection, (value, key) => {
    result.push(iterator(value, key));
  });
  return result;
}
