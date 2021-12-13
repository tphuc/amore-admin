import { Block } from 'baseui/block';
import React, { useState } from 'react';
import StatefulTable, { ActAdd, ActCustom, ActDelete, ActEdit, CellTag, CellWrap, ImagesList } from '../../../components/StatefulTable';
import {
  useSnackbar,
} from 'baseui/snackbar';

import useProducts, { ProductsCRUD } from '../../../framework/supabase/products';
import useBrands from '../../../framework/supabase/brands';
import useCategories from '../../../framework/supabase/categories';
import { CloudinaryAPI } from '../../../framework/cloudinary';
import { Tag } from "baseui/tag";
import { parseLabelPrice, toArray, toObject, urlToFile } from '../../../util';
import { serverTimestamp } from '../../../framework/firebase';
import { AiFillMinusCircle, AiFillPlusCircle, AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiTwotonePlusCircle } from 'react-icons/ai';
import { useStyletron } from 'baseui';
import SearchBar from '../../../components/SearchBar';
import { where, orderBy } from 'firebase/firestore';
import { Button } from 'baseui/button';
import { Plus } from 'baseui/icon';

export default function Product() {

  const [css, theme] = useStyletron()

  const { data: brands } = useBrands();
  const { data: categories } = useCategories();
  const { enqueue } = useSnackbar()
  const [filter, setFilter] = useState({})
  const { data: products, mutate, } = useProducts(filter);


  const onAdd = async (data) => {
    try {

      let { brands, ...fields } = data;

      let res = await ProductsCRUD.create({
        ...fields,
        brand: brands?.length ? brands[0]?.id : null,
      });
      console.log(res)
      if (!res.error) {
        enqueue({
          message: 'Thêm thành công!',
        })
        mutate()
        return true
      }

    }
    catch (e) {
      console.log(e)
    }

  }

  const onEdit = async (id, data) => {
    try {

      let { brands, ...fields } = data;
      let res = await ProductsCRUD.update(id, {
        ...fields,
        brand: brands?.length ? brands[0]?.id : null,
      });
      if (!res.error) {
        enqueue({
          message: 'Sửa thành công!',
        })
        mutate()
        return true
      }
    }
    catch (e) {
      console.log(e)
    }
  }



  const onDelete = async (item) => {
    try {
      let res = await ProductsCRUD.delete(item.id);

      enqueue({
        message: 'Xóa thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }
  }

  return <Block>
    <SearchBar
      onSearch={async (data) => {
        let queries = [];
        setFilter(data);
      }}
      fields={[
        {
          id: "label",
          type: "text",
          placeholder: "Tên",
          defaultValue: ''
        },


      ]} />

    <StatefulTable
      title="Sản phẩm"
      actionText={<ActCustom
      icon={<Plus/>}
      header={'Thêm sản phẩm'}
        onConfirm={onAdd}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên sản phẩm'
          },

          {
            id: "brands",
            type: "select",
            placeholder: 'thuộc hãng',
            options: brands,
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "id"
            },
          },
          {
            id: "categories",
            type: "select-multiple",
            placeholder: 'thuộc danh mục',
            options: categories,
            props: {
              labelKey: "label",
              valueKey: "id"
            },
          },
          {
            id: "variants",
            type: "select-multiple",
            placeholder: 'sizes',
            props: {
              creatable: true,
              labelKey: "label",
              valueKey: "value"
            },

          },
          {
            id: "images",
            type: "file",
            multiple: true,
            placeholder: 'hình ảnh được upload',
            props: {
              creatable: true,
            },
          },
          {
            id: "price",
            placeholder: "price",
            type: "text",
            defaultValue: ''
          },
          {
            id: "description",
            type: "richtext",
            defaultValue: ''
          },

        ]} kind='primary' shape='pill' />}
      data={products || []}
      columns={['Tên', 'Nhãn hiệu', 'Danh mục', 'Lựa chọn', 'Hình ảnh', '_']}
      mapRow={(item) => [
        item.label,
        item.brand?.label,
        item.categories?.map(item => item.label).join(','),
        <CellWrap>{item.variants?.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
        <ImagesList images={item.images} />,
        <>
          <ActDelete onConfirm={() => onDelete(item)} />
          <ActEdit fields={[
            {
              id: "label",
              type: "text",
              placeholder: 'Tên sản phẩm',
              defaultValue: item['label']
            },
            {
              id: "brands",
              type: "select",
              placeholder: 'thuộc hãng',
              options: brands,
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "id"
              },
              defaultValue: item.brand ? [item.brand] : null
            },
            {
              id: "categories",
              type: "select-multiple",
              placeholder: 'thuộc danh mục',
              options: categories,
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "id"
              },
              defaultValue: item.categories,
            },
            {
              id: "variants",
              type: "select-multiple",
              placeholder: 'variants',
              props: {
                creatable: true,
                labelKey: "label",
                valueKey: "value"
              },
              defaultValue: item['variants']

            },
            {
              id: "images",
              type: "file",
              multiple: true,
              placeholder: 'hình ảnh được upload',
              props: {
                creatable: true,
                valueKey: 'name'
              },
              defaultValue: item.images
            },
            {
              id: "price",
              placeholder: "price",
              type: "text",
              defaultValue: item['price'] || ''
            },
            {
              id: "description",
              type: "richtext",
              defaultValue: item['description'] || ''
            },

          ]} onConfirm={(data) => onEdit(item.id, data)} />

        </>
      ]}
    />

  </Block>
}