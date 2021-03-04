<template>
	<div class="hello">
		<div class="actions">
			<button v-on:click="initializeData();" v-if="!values.length && !principles.length">Populate DB</button>
			<button v-on:click="clearFn()">Clear DB</button>
		</div>



		<h2>Values</h2>
		<ol>
			<li v-for="(value, idx) in values" v-bind:key="idx">
					<input type="text" v-model="value.title" v-on:change="updateFn(value)" /> <button v-on:click="deleteFn(value)">x</button>
			</li>
		</ol>

		<div v-if="values.length < 4">
			<input type="text" v-model="newValues" /><button v-on:click="addFn('values');">Add Values</button>
		</div>

		<h2>Principles</h2>
		<ol>
			<li v-for="(principle, idx) in principles" v-bind:key="idx">
					<input type="text" v-model="principle.title" v-on:change="updateFn(principle)" /> <button v-on:click="deleteFn(principle)">x</button>
			</li>
		</ol>

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
				if(response.rows.length > 0){
					for(let d = 0; d < response.rows.length; d++){
						if(response.rows[d].doc.type == "values"){
							self.values.push(response.rows[d].doc)
						}else{
							self.principles.push(response.rows[d].doc)
						}

					}
				}else{
					self.initializeData();
				}


			}).catch(function(err){
				console.error(err);
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
				if(self.values.length + self.principles.length < 1){
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
					]).then(function(r){
						console.log("DB Populated successfully", r);
					},function(err){
						console.error("Could not populate db", err);
					});

					self.getAll();

					return true;
				}else{
					console.error("DB is not empty");
					return false;
				}

			},

			getAll: function(){
				let self = this;

				self.values = [];
				self.principles = [];

				db.allDocs({
					include_docs: true
				}).then(function(response){
					console.log("retrieve response",response)
					for(let d = 0; d < response.rows.length; d++){
						if(response.rows[d].doc.type == "values"){
							self.values.push(response.rows[d].doc)
						}else{
							self.principles.push(response.rows[d].doc)
						}
					}
				}).catch(function(err){
					console.error(err);
				});
			},
			addFn: function(type){
				let self = this;

				db.post({
					title: (type == 'values' ? self.newValues:self.newPrinciples),
					type: type
				}).then(function(response) {
					console.log("insert response", response)
					self.newValues = "";
					self.newPrinciples = "";
					self.getAll();
				}).catch(function(err) {
					console.error(err);
				});
			},

			updateFn: function(doc){
				let self = this;

				db.put({
					_id: doc._id,
					title: doc.title,
					_rev: doc._rev,
					type: doc.type
				}).then(function(response) {
					console.log("update response", response)
					self.getAll();
				}).catch(function(err) {
					console.error(err);
				});
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
					console.error(err);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.hello {
		text-align:left;
		width:100%;
	}

	.actions {
		text-align:center;
	}
	h3 {
		margin: 40px 0 0;
	}

	ol {
		display:block;
		width:100%;
	}

	li input {
		width:50%;
		padding:5px;
		margin:3px;
	}

	a {
		color: #42b983;
	}
</style>
