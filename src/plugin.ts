import { getSortedStyles } from './utilities/getSortedStyles';
import { getStyles, styleData } from './utilities/getStyles';
import { SettingKey, defaultSettings, setSetting } from './utilities/settings';
import { getFromStore } from './utilities/store';

figma.showUI(__html__, {
  width: 300,
  height: 400,
  themeColors: true
});

const calcUiHeight = (figma: PluginAPI, localStyleCount: number, remoteStyleCount: number,): number => {
  const headerHeight = 48
  const footerHeight = 40
  // no items
  if (!localStyleCount && !remoteStyleCount) return headerHeight + footerHeight + 48

  const listHeaderHeight = 36
  const listMargin = 2 * 8
  const height = headerHeight + footerHeight + 2 * listHeaderHeight + listMargin + (localStyleCount ? localStyleCount * 40 : 40) + (remoteStyleCount ? remoteStyleCount * 40 : 40)
  const maxHeight = parseInt(`${figma.viewport.bounds.height * figma.viewport.zoom}`) - 100
  // return max height if height is greater than max height
  if (height > maxHeight) return maxHeight
  // otherwise return height
  return height
}

const reloadUi = async (figma: PluginAPI, stylesById?: Record<string, styleData>) => {
  // get settings
  const settings = {
    ...defaultSettings,
    ...getFromStore(figma, 'SETTINGS')
  }
  // fetch nodes and styles if not provided
  if (!stylesById) {
    stylesById = await getStyles(figma, settings);
  }
  const remoteStyles = getSortedStyles(Object.values(stylesById).filter(style => style.remote))
  const localStyles = getSortedStyles(Object.values(stylesById).filter(style => !style.remote))
  // resize ui
  figma.ui.resize(300, calcUiHeight(figma, localStyles.length, remoteStyles.length));
  // post data to UI
  figma.ui.postMessage({
    remoteStyles,
    localStyles,
    settings,
    currentPage: figma.currentPage.name
  })
  // return styles
  return stylesById
}

const runPlugin = async () => {
  // await figma.currentPage.loadAsync();
  // get all nodes in current page with style
  let stylesById = await reloadUi(figma)

  figma.ui.onmessage = async (msg: { type: string, data: unknown }) => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'selectNodes') {
      const styleId = msg.data as string
      figma.currentPage.selection = stylesById[styleId].nodes;
      figma.viewport.scrollAndZoomIntoView(stylesById[styleId].nodes);
      figma.notify(`Selected ${stylesById[styleId].nodes.length} nodes with style "${stylesById[styleId].name}"`)
    }
    // store settings
    if (msg.type === 'storeSettings') {
      const refreshOnUpdate: SettingKey[] = ["SHOW_EFFECT", "SHOW_GRID", "SHOW_PAINT", "SHOW_TEXT"]
      const data = msg.data as Record<SettingKey, string | boolean>
      for (const key in data) {
        setSetting(figma, key as SettingKey, data[key])
      }

      if (Object.keys(msg.data).some((key: SettingKey) => refreshOnUpdate.includes(key))) {
        stylesById = await reloadUi(figma)
      } else {
        stylesById = await reloadUi(figma, stylesById)
      }

    }

    if (msg.type === 'refresh') {
      stylesById = await reloadUi(figma)
    }
  }

  figma.on('currentpagechange', async () => {
    stylesById = await reloadUi(figma)
  })
}

runPlugin()