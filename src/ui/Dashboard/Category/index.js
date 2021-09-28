import { Block } from 'baseui/block';
import React from 'react';
import StatefulTable, { ActAdd, ActDelete, ActEdit } from '../../../components/StatefulTable';
import useCategories from '../../../framework/firebase/api/category';




export default function Category() {

  const {data: categories} = useCategories();

  return <Block>
    <StatefulTable
      title="Danh mục"
      actionText={<ActAdd
        onConfirm={() => { }}
        fields={[
          {
            id: "label",
            type: "text",
            placeholder: 'Tên danh mục'
          }
        ]} kind='primary' shape='pill' />}
      data={[]}
      columns={[]}
      mapRow={(item) => [
        item.name,
        <>
          <ActDelete />
          <ActEdit />
        </>
      ]}
    />

  </Block>
}