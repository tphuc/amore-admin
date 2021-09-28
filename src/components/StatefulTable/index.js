import { useStyletron } from 'baseui'
import { Button } from 'baseui/button'
import { Delete, DeleteAlt, Overflow, Show } from 'baseui/icon'
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



const ActDelete = ({ fields = [], onConfirm = () => {} }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle'><Delete size={24} color={theme.colors.mono800} /></Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Xóa</ModalHeader>
      {/* <ModalBody>
        <DynamicFields />
      </ModalBody> */}
      <ModalFooter>
        <ModalButton shape='pill' onClick={onConfirm}>Xác nhận </ModalButton>
      </ModalFooter>
    </Modal>
  </>
}

const ActEdit = ({ fields = [], onConfirm = () => {} }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle'><Overflow size={24} color={theme.colors.mono800} /></Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Chỉnh sửa</ModalHeader>
      <ModalBody>
        <DynamicFields fields={fields} />
      </ModalBody>
      <ModalFooter>
        <ModalButton shape='pill' onClick={onConfirm}>Xác nhận </ModalButton>
      </ModalFooter>
    </Modal>
  </>
}

const ActAdd = ({ fields = [], onConfirm = () => {}, ...props }) => {
  const [_, theme] = useStyletron();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return <>
    <Button onClick={() => setIsModalOpen(true)} kind='secondary' size='compact' shape='circle' {...props}>Thêm</Button>
    <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
      <ModalHeader>Thêm</ModalHeader>
      <ModalBody>
        <DynamicFields fields={fields} />
      </ModalBody>
      <ModalFooter>
        <ModalButton shape='pill' onClick={onConfirm}>Xác nhận </ModalButton>
      </ModalFooter>
    </Modal>
  </>
}



const ImagesList = ({ images = [] }) => {
  return <div>
    {images.map(item => <Avatar
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
      }} src={item} />)}
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
  ImagesList
}