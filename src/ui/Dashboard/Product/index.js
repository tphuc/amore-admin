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

export default function Product() {

  const [css, theme] = useStyletron()
  
  const { data: brands} = useBrands();
  const { data: categories} = useCategories();
  const { enqueue } = useSnackbar()
  const [filter, setFilter] = useState({})
  const { data: products, mutate, } = useProducts(filter);


  const onAdd = async (data) => {
    try {

      let files = data.images || []
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      let { images, brands,  ...fields } = data;

      let res = await ProductsCRUD.create({
        ...fields,
        images: fileUrls,
        brand: brands[0]?.id || null,
      });

      enqueue({
        message: 'Thêm thành công!',
      })
      mutate()
      return true
    }
    catch (e) {

    }

  }

  const onEdit = async (id, data) => {
    try {
      let files = data.images
      let fileUrls = await CloudinaryAPI.uploadFiles(files)
      let { images, brands,  ...fields } = data;
      let res = await ProductsCRUD.update(id, {
        ...fields,
        images: fileUrls,
        brand: brands[0]?.id || null,
      });
      enqueue({
        message: 'Sửa thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }


  }

  const editProductHighlight = async (id, data) => {
    try {
      let res = await ProductsCRUD.update(id, {
          starred: data
      });
      enqueue({
        message: 'Sửa thành công!',
      })
      mutate()
      return true
    }
    catch (e) {
      console.log(e)
    }


  }

  const editCustom = async (id, data) => {
    try {
      let res = await ProductsCRUD.update(id, data);
      enqueue({
        message: 'Sửa thành công!',
      })
      mutate()
      return true
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

      // mutate(res, false)

    }}
    fields={[
      {
        id:"label",
        type:"text",
        placeholder:"Tên",
        defaultValue: ''
      },


    ]}/>

    <StatefulTable
      title="Sản phẩm"
      actionText={<ActAdd
        onConfirm={onAdd}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên sản phẩm'
          },
          {
            id: "origin",
            type: "text",
            placeholder: 'xuất xứ',
          },
          {
            id: "gender",
            type: "text",
            placeholder: 'giới tính',
          },
          {
            id: "style",
            type: "text",
            placeholder: 'phong cách',
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
              creatable: true,
              labelKey: "label",
              valueKey: "id"
            },
          },
          {
            id: "variants",
            type: "select-multiple",
            placeholder: 'lựa chọn (dung tích-giá tiền)',
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
            id: "introduction",
            type: "richtext",
            defaultValue: ''
          }
        ]} kind='primary' shape='pill' />}
      data={products || []}
      columns={['Ưu tiên', 'Tên',   'Phong cách', 'Nhãn hiệu', 'Danh mục', 'Lựa chọn',  'Hình ảnh', '_']}
      mapRow={(item) => [
        <div style={{display:"flex", flexDirection:"row",alignItems:"center"}}>
        <span>{item.arrange}</span>
        <ActCustom header='Lên trang chính' onClick={() => editCustom(item.id, { arrange: item?.arrange + 1})} icon={<AiOutlinePlus/>}/>
        <ActCustom header='Lên trang chính' onClick={() => editCustom(item.id, { arrange: item?.arrange - 1})} icon={<AiOutlineMinus/>}/>
        </div>
        ,
        item.label,
        item.style,
        item.brand.label,
        item.categories?.map(item => item.label).join(','),
        <CellWrap>{item.variants.map(item => <CellTag closeable={false}>{item.label}</CellTag>)}</CellWrap>,
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
              id: "origin",
              type: "text",
              placeholder: 'xuất xứ',
              defaultValue: item['origin']
            },
            {
              id: "gender",
              type: "text",
              placeholder: 'giới tính',
              defaultValue: item['gender']
            },
            {
              id: "style",
              type: "text",
              placeholder: 'phong cách',
              defaultValue: item['style']
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
              defaultValue: [item['brand']]
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
              placeholder: 'lựa chọn (dung tích-giá tiền)',
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
              id: "introduction",
              type: "richtext",
              defaultValue: item['introduction'] || ''
            }
          ]} onConfirm={(data) => onEdit(item.id, data)} />
          <ActCustom header='Lên trang chính' onClick={() => editProductHighlight(item.id, !item?.starred)} icon={<AiFillStar color={item?.starred ? theme.colors.accent500 : theme.colors.mono500}/>}/>

        </>
      ]}
    />

  </Block>
}