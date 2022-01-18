import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategories'
})
export class SubCategoriesPipe implements PipeTransform {

  transform(value: any, staticData: any): any {
    // let allCategories = [];
    // allCategories = staticData.categoryList;
    // const categoryName = allCategories.filter(item => item.category_id === value);
    // return categoryName[0].category_name;
    if (value) {
      const categoryname = value.map(({ subCategoryName }) => subCategoryName);
      return categoryname.join(', ');
    }
      
  }

}
