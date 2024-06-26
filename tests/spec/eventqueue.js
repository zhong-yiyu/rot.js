describe("EventQueue", function() {
	it("should return added event", function() {
		var q = new ROT.EventQueue();
		q.add("a", 100);
		expect(q.get()).toEqual("a");
	});

	it("should return null when no events are available", function() {
		var q = new ROT.EventQueue();
		expect(q.get()).toEqual(null);
	});

	it("should remove returned events", function() {
		var q = new ROT.EventQueue();
		q.add(0, 0);
		q.get();
		expect(q.get()).toEqual(null);
	});

	it("should look up time of events", function() {
		var q = new ROT.EventQueue();
		q.add(123, 187);
		q.add(456, 42);
		expect(q.getEventTime(123)).toEqual(187);
		expect(q.getEventTime(456)).toEqual(42);
	});

	it("should look up correct times after events removed", function() {
		var q = new ROT.EventQueue();
		q.add(123, 187);
		q.add(456, 42);
		q.add(789, 411);
                q.get();
		expect(q.getEventTime(456)).toBeUndefined();
		expect(q.getEventTime(123)).toEqual(187 - 42);
		expect(q.getEventTime(789)).toEqual(411 - 42);
	});

	it("should remove events", function() {
		var q = new ROT.EventQueue();
		q.add(123, 0);
		q.add(456, 0);
		var result = q.remove(123);
		expect(result).toEqual(true);
		expect(q.get()).toEqual(456);
	});

	it("should survive removal of non-existent events", function() {
		var q = new ROT.EventQueue();
		q.add(0, 0);
		var result = q.remove(1);
		expect(result).toEqual(false);
		expect(q.get()).toEqual(0);
	});

	it("should return events sorted", function() {
		var q = new ROT.EventQueue();
		q.add(456, 10);
		q.add(123, 5);
		q.add(789, 15);
		expect(q.get()).toEqual(123);
		expect(q.get()).toEqual(456);
		expect(q.get()).toEqual(789);
	});

	it("should compute elapsed time", function() {
		var q = new ROT.EventQueue();
		q.add(456, 10);
		q.add(123, 5);
		q.add(789, 15);
		q.get();
		q.get();
		q.get();
		expect(q.getTime()).toEqual(15);
	});

	it("should maintain event order for same timestamps", function() {
		var q = new ROT.EventQueue();
		q.add(456, 10);
		q.add(123, 10);
		q.add(789, 10);
		expect(q.get()).toEqual(456);
		expect(q.get()).toEqual(123);
		expect(q.get()).toEqual(789);
		expect(q.getTime()).toEqual(10);
	});
});
