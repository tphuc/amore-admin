import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import { Check, Delete, DeleteAlt, Overflow, Show } from 'baseui/icon'
import React from 'react'
import PaginatedTable from '../PaginatedTable'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
} from 'baseui/modal';
import DynamicFields from '../DynamicFields'
import { Avatar } from 'baseui/avatar';
import { Tag } from 'baseui/tag'


const CellWrap = (props) => {
  return <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", width:"100%"}}>
    {props.children}
  </div>
}
 
const CellTag = (props) => {
  const [_, theme] = useStyletron()
  return <Tag 
  size='small'
  closeable={false}
  overrides={{
    Text: {
      style: () => ({
        fontSize:12,
        color: theme.colors.mono800
      })
    }
  }}
  color={theme.colors.mono200}
  variant="solid"
  kind="custom">{props.children}</Tag>
}

const ActDelete = ({ fields = [], onConfirm = () => { } }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle'><Delete size={24} color={theme.colors.mono800} /></Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Xóa</ModalHeader>
      <ModalBody>
        <DynamicFields
          onAction={async (state) => {

            let result = await onConfirm(state)
            if (result === true) {
              setIsModalOpen(false)
            }

          }} fields={fields} />
      </ModalBody>

    </Modal>
  </>
}

const ActEdit = ({ fields = [], onConfirm = () => { } }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle'><Overflow size={24} color={theme.colors.mono800} /></Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Chỉnh sửa</ModalHeader>
      <ModalBody>
        <DynamicFields
          onAction={async (state) => {
            let result = await onConfirm(state)
            if (result === true) {
              setIsModalOpen(false)
            }
          }} fields={fields} />
      </ModalBody>
    </Modal>
  </>
}


const ActConfirm = ({ fields = [], header, onConfirm = () => { } }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle'><Check size={24} color={theme.colors.mono800} /></Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <DynamicFields
          onAction={async (state) => {
            let result = await onConfirm(state)
            if (result === true) {
              setIsModalOpen(false)
            }
          }} fields={fields} />
      </ModalBody>
    </Modal>
  </>
}


const ActCustom = ({ fields = [], header, icon, onClick = null, onConfirm = () => { } }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => {
      if(onClick)
        onClick()
      else
        setIsModalOpen(true)
      
     
    }} kind='secondary' size='compact' shape='circle'>{icon}</Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>{header}</ModalHeader>
      <ModalBody>
        <DynamicFields
          onAction={async (state) => {
            let result = await onConfirm(state)
            if (result === true) {
              setIsModalOpen(false)
            }
          }} fields={fields} />
      </ModalBody>
    </Modal>
  </>
}

const ActAdd = ({ fields = [], onConfirm = () => { }, ...props }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle' {...props}>Thêm</Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Thêm</ModalHeader>
      <ModalBody>
        <DynamicFields
          onAction={async (state) => {
            let result = await onConfirm(state)
            if (result === true) {
              setIsModalOpen(false)
            }
          }} fields={fields} />
      </ModalBody>
    </Modal>
  </>
}





const ImagesList = ({ images = [] }) => {
  return <div>
    {images?.map(item => <Avatar
      size="scale1000"
      overrides={{
        Avatar: {
          style: ({ $theme }) => ({
            borderTopLeftRadius: $theme.borders.radius100,
            borderTopRightRadius: $theme.borders.radius100,
            borderBottomRightRadius: $theme.borders.radius100,
            borderBottomLeftRadius: $theme.borders.radius100,
          }),
        },
        Root: {
          style: ({ $theme }) => ({
            borderTopLeftRadius: $theme.borders.radius100,
            borderTopRightRadius: $theme.borders.radius100,
            borderBottomRightRadius: $theme.borders.radius100,
            borderBottomLeftRadius: $theme.borders.radius100,
          }),
        },
      }} src={item.url} />)}
  </div>
}




export default function StatefulTable({
  title,
  actionText,
  onAction,
  data,
  columns,
  mapRow = (item) => [],

}) {
  const formatData = () => {
    return data.map(item => mapRow(item))
  }
  return <PaginatedTable
    title={title}
    onAction={onAction}
    actionText={actionText}
    data={formatData()}
    columns={columns}
  />
}


export {
  ActDelete,
  ActEdit,
  ActAdd,
  ActConfirm,
  ActCustom,
  CellWrap,
  CellTag,
  ImagesList,

}