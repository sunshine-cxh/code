/*
 * @Descripttion : Do not edit
 * @Author       : hezihua
 * @Date         : 2020-05-07 11:00:29
 * @LastEditors  : caojiarong
 * @LastEditTime : 2020-07-01 17:31:32
 */
import React, { Component } from 'react'
import { connect } from 'dva'
import Button from 'components/Button'
import Popover from 'components/Popover'
import Form from 'components/Form'
import './index.less'

export default class extends Component {
  handlePopoverChange = (e) => {
    let { popoverChange } = this.props
    e.stopPropagation()
    popoverChange(true)
  }
  render() {
    let { columns, searchevent, popoverVisible } = this.props
    let formProps = {
      columns: columns,
      searchevent,
    }

    let popoverProps = {
      visible: popoverVisible,
      // getPopupContainer: (node) => {
      //   if (node) {
      //     return node.parentNode
      //   }
      //   return document.body
      // },
      content: (
        <div
          className="popover-content"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <Form {...formProps}></Form>
        </div>
      ),
    }

    return (
      <Popover {...popoverProps}>
        <Button
          type="primary2"
          className="toolbar-item"
          icon="filter"
          onClick={(e) => this.handlePopoverChange(e)}
        >
          筛选
        </Button>
      </Popover>
    )
  }
}
