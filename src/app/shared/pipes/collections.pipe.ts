import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collections'
})
export class CollectionsPipe implements PipeTransform {

  transform(value: any, staticData: any): any {
    let allCollections = [];
    allCollections = staticData.collectionList;
    const collectionName = allCollections.filter(item => item.collection_id === value);
    return collectionName[0].collection_name;
  }

}
