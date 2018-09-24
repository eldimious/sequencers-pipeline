## Description

Generators	and	Iterators	are	new	ES6	features	that	will	allow	things	like
this:

```js
function*	fibonacci()	{
				let	[prev,	curr]	=	[0,	1];
				for	(;;)	{
								[prev,	curr]	=	[curr,	prev	+	curr];
								yield	curr;
				}
}
```

Using	them	in	this	way,	we	can	do	amazing	things:

```js
let	seq	=	fibonacci();
print(seq.next());	//	
print(seq.next());	//	
print(seq.next());	//	
print(seq.next());	//	
print(seq.next());	//	
```
The	goal is to **implement pseudo-generators without the use of generators**.

The	first	thing	to do	is to implement	the	generator	function:

```js
function	generator(sequencer)	{
			...
}
```

#### generator(sequencer[,	arg1,	arg2,	...]) receives	a	sequencer

function	to	generate	the	sequence	and	returns	an	object	with	a	next()
method.	When	the	next() method	is	invoked,	the	next	value	is	generated.
The	method	could	receive	as	well	optional	arguments	to	be	passed	to	the
sequencer	function.

This	is	an	example	of	a	dummy	sequencer:


```
function	dummySeq()	{
		return	function()	{
				return	"dummy";
		};
}
```
To	test	generator(),	you	could	use	dummySeq() in	this	way:

```
var	seq	=	generator(dummySeq);
seq.next();	//	'dummy'
seq.next();	//	'dummy'
seq.next();	//	'dummy'
....
```
When	you’re	done,	you	should	implement	the	following	generators	(I	think
the	functions	are	self	explanatory):

```
function	factorialSeq()	{...}	//	1,	1,	2,	6,	24,	...
function	fibonacciSeq()	{...}	//	1,	1,	2,	3,	5,	8,	13,	...
function	rangeSeq(start,	step)	{...}	//	rangeSeq(1,	2)		->	1,
	3,	5,	7,	...
function	primeSeq()	{...}	//	2,	3,	5,	7,	11,	13,	...
partialSumSeq(1,	3,	7,	2,	0)	{...}	//	1,	4,	11,	13,	13,	end
```
You	can	use	any	of	them	in	the	same	way:


```
var	seq	=	generator(factorialSeq);
seq.next();	//	!0	=	
seq.next();	//	!1	=	
seq.next();	//	!2	=	
seq.next();	//	!3	=	
seq.next();	//	!4	=	
...
```
There	are	some	sequences	which	are	infinite	and	others	are	not.	For
example:

primeSeq:	Is	infinite
partialSumSeq:	Is	limited	to	the	passed	values.
When	the	sequence	is	done	(in	finite	sequences),	if	you	call	seq.next()
again,	it	should	produce	an	error.

## Part	

You	have	to	implement	the	pipeSeq() function.	This	function	allows	you
to	pipe	generator	to	some	functions.	Thus	the	generated	sequence	is
streamed	to	a	function.

pipeSeq() receives	the	sequencer	function	and	optionally	some
parameters	passed	to	the	sequencer	and	returns	and	object	with	two
methods:

```
pipeline(pipe):receives	the	pipe	function	and	optionally	some
```

```
parameters	passed	to	the	pipe	function.	It	returns	itself.
invoke():	return	the	piped	sequencer	object.
This	is	and	example	to	understand	this:
```
Given	this	pipeline	function:

```
function	accumulator()	{
		var	sum	=	0;
		return	function(value)	{
				sum	+=	value;
				return	sum;
		};
}
```
```
//Example
var	ac	=	accumulator();	//	ac(1)	->	1,	ac(4)	->	5,	ac(2)	->	
```
We	could	create	the	piped	sequencer	like	this:

```
var	pipedSeq	=	pipeSeq(rangeSeq,	2,	3)	//	2,	5,	8,	
						.pipeline(accumulator)	//	2,	7	(5+2),	15(7+8),	26(15+
)
						.invoke();
```
```
pipedSeq is	a	range	sequencer	whose	values	are	streamed	to	the
accumulator() function.	This	function	sum	the	values	of	the	sequence.
```

These	are	the	expected	results:

```
var	seq	=	generator(pipedSeq);
seq.next();	//	
seq.next();	//	
seq.next();	//	
seq.next();	//	
...
```
The	same	pipedSeq object	can	have	more	than	one	pipe.

You	should	implement	too	the	isEven pipe	function:

```
function	isEven(){...}
```
```
var	ie	=	isEven();	//	ie(1)	->	{status:	false,	number:1},	ie(
4)	->	{status:	true,	number:4}


## Requirements

- Need to run `npm install` to install all required packages

## Running tests

- To run the tests you have to run `npm run tests`
