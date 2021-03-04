<template>
	<div class="hello">
		<button v-on:click="initializeData();">Populate DB</button>
		<button v-on:click="clearFn()">Clear DB</button>


		<h2>Values</h2>
		<ul>
			<li v-for="(value, idx) in values" v-bind:key="idx">
					{{value.title}} - <button v-on:click="deleteFn(value)">x</button>
			</li>
		</ul>

		<div v-if="values.length < 4">
			<input type="text" v-model="newValues" /><button v-on:click="addFn('values');">Add Values</button>
		</div>

		<h2>Principles</h2>
		<ul>
			<li v-for="(principle, idx) in principles" v-bind:key="idx">
					{{principle.title}}
			</li>
		</ul>

		<div v-if="principles.length < 12">
			<input type="text" v-model="newPrinciples" /><button v-on:click="addFn('principles');">Add principles</button>
		</div>


	</div>
</template>

<script>
	import PouchDB from 'pouchdb';
	let db = new PouchDB("mydb");

	export default {
		name: 'HelloWorld',
		data () {
			return {
				values: [],
				principles: [],

				newValues: "",
				newPrinciples: ""
			}
		},
		created: function() {
			let self = this;



			db.allDocs({
				include_docs: true
			}).then(function(response){
				console.log("res",response)
				for(let d = 0; d < response.rows.length; d++){
					if(response.rows[d].doc.type == "values"){
						self.values.push(response.rows[d].doc)
					}else{
						self.principles.push(response.rows[d].doc)
					}

				}

			}).catch(function(err){
				console.log(err);
			});
			// db.post({
			// 	title: 'Ziggy Stardust'
			// }).then(function(response) {
			// 	console.log("res", response)
			// }).catch(function(err) {
			// 	console.log(err);
			// });
			// db.get('test').then(function(doc) {
			// 	console.log("doc", doc)
			// }).catch(function(err) {
			// 	console.log(err);
			// });
		},
		methods: {
			initializeData: function(){
				let self = this;

				db.bulkDocs([
					{title:"Individuals and Interactions Over Processes and Tools", type:"values"},
					{title:"Working Software Over Comprehensive Documentation", type:"values"},
					{title:"Customer Collaboration Over Contract Negotiation", type:"values"},
					{title:"Responding to Change Over Following a Plan", type:"values"},
					{title:"Early and Continuous Delivery of Valuable Software", type:"principles"},
					{title:"Embrace Change", type:"principles"},
					{title:"Frequent Delivery", type:"principles"},
					{title:"Business and Developers Together", type:"principles"},
					{title:"Motivated Individuals", type:"principles"},
					{title:"Face-to-Face Conversation", type:"principles"},
					{title:"Sustainable and Constant Phase", type:"principles"},
					{title:"Working Software", type:"principles"},
					{title:"Technical Excellence", type:"principles"},
					{title:"Simplicity", type:"principles"},
					{title:"Self-Organizing Teams", type:"principles"},
					{title:"Regular Reflection and Adjustment", type:"principles"}
				]);

				self.getAll();
			},

			getAll: function(){
				let self = this;

				self.values = [];
				self.principles = [];

				db.allDocs({
					include_docs: true
				}).then(function(response){
					console.log("res",response)
					for(let d = 0; d < response.rows.length; d++){
						if(response.rows[d].doc.type == "values"){
							self.values.push(response.rows[d].doc)
						}else{
							self.principles.push(response.rows[d].doc)
						}
					}
				}).catch(function(err){
					console.log(err);
				});
			},
			addFn: function(type){
				let self = this;

				db.post({
					title: self.newValues,
					type: type
				}).then(function(response) {
					console.log("res", response)
					self.getAll();
				}).catch(function(err) {
					console.log(err);
				});
			},

			updateFn: function(){

			},

			deleteFn: function(doc){
				let self = this;
				db.remove(doc)
				self.getAll();
			},

			clearFn: function(){
				let self = this;

				db.allDocs({
					include_docs: true
				}).then(function(response){
					for(let d = 0; d < response.rows.length; d++){
						db.remove(response.rows[d].doc)
					}

					self.getAll();
				}).catch(function(err){
					console.log(err);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		text-align:left;
	}
	h3 {
		margin: 40px 0 0;
	}


	a {
		color: #42b983;
	}
</style>
