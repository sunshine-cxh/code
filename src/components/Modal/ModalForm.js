/*
 * @Descripttion : 表单modal
 * @Author       : wuhaidong
 * @Date         : 2019-12-18 17:04:56
 * @LastEditors  : hezihua
 * @LastEditTime : 2020-08-06 11:29:39
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import Form from '../Form'
import cx from 'classnames'
import './style/index.less'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
    }
  }

  static propTypes = {
    title: PropTypes.string,
    record: PropTypes.object,
    visible: PropTypes.bool,
    columns: PropTypes.array,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
    modalOpts: PropTypes.object,
    formOpts: PropTypes.object,
    className: PropTypes.string,
  }

  static defaultProps = {
    modalOpts: {
      width: 740,
    },
    onSubmitTitle: '保存',
    onCancelTitle: '关闭',
    onContinueTitle: '继续添加',
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({
        visible: nextProps.visible,
      })
    }
  }

  closeModal = () => {
    if (this.props.onCancel) {
      this.props.onCancel()
      return
    }
    this.setState({
      visible: false,
    })
  }

  onSubmit = () => {
    const { record, onSubmit } = this.props
    this.refs.form.validateFields((error, value) => {
      if (error) {
        console.log(error)
        return
      }
      onSubmit && onSubmit(value, record)
    })
  }

  onContinue = () => {
    const { record, onContinue } = this.props
    this.refs.form.validateFields((error, value) => {
      if (error) {
        console.log(error)
        return
      }
      onContinue && onContinue(value, record)
      this.refs.form.resetFields()
    })
  }

  render() {
    const {
      title,
      record,
      className,
      columns,
      onSubmit,
      onSubmitTitle,
      onCancel,
      onCancelTitle,
      onContinue,
      onContinueTitle,
      modalOpts,
      formOpts,
      loading,
      noFull,
      preview,
    } = this.props
    const classname = cx(className, 'antui-modalform', 'antui-modalform-custom', { 'full-modal': !noFull })
    const modalProps = {
      className: classname,
      visible: this.state.visible,
      title: title || (record ? '修改' : '新增'),
      maskClosable: false,
      destroyOnClose: true,
      onCancel: this.closeModal,
      footer: [
        onSubmit && (
          <Button key="submit" type="primary3" className="footer-left" onClick={this.onSubmit} loading={loading}>
            {onSubmitTitle}
          </Button>
        ),
        onContinue && (
          <Button key="comtinue" type="primary3" onClick={this.onContinue}>
            {onContinueTitle}
          </Button>
        ),
        onCancel && (
          <Button key="back" type="primary31" onClick={this.closeModal}>
            {onCancelTitle}
          </Button>
        ),
      ],
      ...modalOpts,
    }

    const formProps = {
      ref: 'form',
      columns,
      onSubmit,
      record,
      preview,
      footer: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      ...formOpts,
    }

    return (
      <Modal {...modalProps}>
        <Form {...formProps} />
      </Modal>
    )
  }
}

export default ModalForm
