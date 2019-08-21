export const filterParams = (list, requestParams, filterList) => {
  if (
    !requestParams ||
    !Object.keys(requestParams).length ||
    !filterList ||
    !filterList.length
  ) {
    return list
  }

  const execFilter = (data, params, filters) => {
    const filter = filters.shift()

    if (params[filter.key]) {
      filter.validate && filter.validate(params)
      data = data.filter(filter.filter(params))
    }

    if (!filters.length) {
      return data
    } else {
      return execFilter(data, params, filters)
    }
  }

  return execFilter(list, requestParams, filterList)
}
