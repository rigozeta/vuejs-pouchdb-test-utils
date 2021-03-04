import {
	shallowMount
} from '@vue/test-utils'

import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
	const wrapper = shallowMount(HelloWorld);

	it('populates db when initialized or db is empty', (done)=>{
		wrapper.vm.initializeData().then((res)=>{
			expect(wrapper.vm.$data.dataInitialized).toBe(true)
			done();
		});
	})

	it('adds values in db', (done)=>{
		wrapper.vm.addFn('values').then((res)=>{
			expect(res).toBe(true)
			done();
		});
	})

	it('adds principles in db', (done)=>{
		wrapper.vm.addFn('principles').then((res)=>{
			expect(res).toBe(true)
			done();
		});
	})

	it('updates doc in db', (done)=>{
		wrapper.vm.updateFn({"_id": new Date()}).then((res)=>{
			expect(res).toBe(true)
			done();
		});
	})

	it('clears db', (done)=>{
		wrapper.vm.clearFn().then((res)=>{
			expect(res).toBe(0)
			done();
		});
	})

	// it('adds values in db', async ()=>{
	// 	await flushPromises().then(()=>{
	// 		expect(wrapper.vm.addFn('values','test')).toBe(true)
	// 	},()=>{
	// 		return false
	// 	})
	//
	//
	// })

	// it('renders props.msg when passed', () => {
	// 	const msg = 'new message'
	// 	const wrapper = shallowMount(HelloWorld, {
	// 		propsData: {
	// 			msg
	// 		}
	// 	})
	// 	expect(wrapper.text()).toMatch(msg)
	// })
})
