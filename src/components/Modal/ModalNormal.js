/*
 * @Descripttion : Children 自定义modal
 * @Author       : wuhaidong
 * @Date         : 2020-01-10 13:57:07
 * @LastEditors  : wuhaidong
 * @LastEditTime : 2020-09-08 16:08:24
 */
import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './style/index.less'
import Modal from './Modal'
import Button from 'components/Button'

class ModalNormal extends Component {
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

  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
    }
  }

  static defaultProps = {
    modalOpts: {
      width: 740,
    },
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
    onSubmit && onSubmit(record)
  }

  render() {
    const {
      title,
      record,
      className,
      onSubmit,
      onCancel,
      modalOpts,
      loading,
      noFull,
      hiddenYScrollbar,
      children,
      onSubmitTitle,
      onCancelTitle,
      footer,
    } = this.props

    const classname = cx(className, 'antui-modalform', {
      'full-modal': !noFull,
      'hidden-y-scrollbar': hiddenYScrollbar
    })
    const modalProps = {
      className: classname,
      visible: this.state.visible,
      style: { top: 20 },
      title: title || (record ? '编辑' : '新增'),
      maskClosable: false,
      destroyOnClose: true,
      onCancel: this.closeModal,
      footer: footer
        ? [
            onSubmit && (
              <Button
                key="submit"
                type="primary3"
                className="footer-left"
                onClick={this.onSubmit}
                loading={loading}
              >
                {onSubmitTitle ? onSubmitTitle : '保存'}
              </Button>
            ),
            onCancel && (
              <Button key="back" type="primary3" onClick={this.closeModal}>
                {onCancelTitle ? onCancelTitle : '关闭'}
              </Button>
            ),
          ]
        : false,
      ...modalOpts,
    }

    return <Modal {...modalProps}>{children}</Modal>
  }
}

export default ModalNormal
