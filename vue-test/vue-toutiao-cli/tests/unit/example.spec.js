import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Tab from '@/components/Tab.vue'

describe('检测tab.vue', () => {
  it('检测tab.vue是否被正常渲染', () => {
    // const msg = 'new message'
    const wrapper = shallowMount(Tab, {
      propsData: { 
        tabs: [
          {
            title: 'tab111111'
          },
          {
            title: 'tab222222'
          }
        ]
       }
    })
    // expect(wrapper.text()).to.include(msg)
    expect(wrapper.contains('.item')).to.equal(true);
  })
})
