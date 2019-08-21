import { Injectable } from '@angular/core'

@Injectable()
export class PageService {
  // public config = {
  //   front: false,
  //   zeroIndexed: true,
  //   placement: 'right',
  //   show: true,
  //   showSize: true,
  //   pageSizes: [10, 20, 30, 40],
  //   showQuickJumper: false,
  //   pageIndex: 1,
  //   toTop: true
  // }

  public total: number // 数据数
  public pageIndex = 1
  public pageSize = 10
  public loading: boolean
  public totalPage: number // 总页数
  public complete = false
  public pageSizes = [10, 20, 30, 40]
  constructor() {
    this.pageIndex = 1
    this.total = 0
    this.pageSize = 10
    this.loading = false
  }
  /**
   * 获取分页配置信息
   */
  public getConfig() {
    return {
      page_num: this.pageIndex,
      page_size: this.pageSize
    }
  }

  public next() {
    if (!this.complete) {
      this.pageIndex += 1
      this.checkComplete()
    }
  }

  public reset() {
    this.pageIndex = 1
    this.loading = false
    this.complete = false
  }

  /**
   * 更新分页配置信息
   * @param total 数据总数
   */
  public update(total) {
    this.total = total
    this.totalPage = Math.ceil(this.total / this.pageSize)
    this.checkComplete()
  }

  private checkComplete() {
    if (this.pageIndex >= this.totalPage) {
      this.complete = true
    }
  }

  public change({ type, pi, ps }) {
    if (['pi', 'ps'].includes(type)) {
      this.pageIndex = pi
      this.pageSize = ps
      return true
    }
  }
}
