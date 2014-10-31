var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

describe('backendJob', function () {
    describe('Job', function () {
        var job, Job;

        before(function () {
            Job = require('../../lib/backend/Job');
            job = new Job('foo');
        });

        it('should create a PersistenceJob', function () {
            var createdJob = job._createPersistenceJob({foo: 'bar'}).toJSON();

            expect(createdJob.type).to.equal('foo');
            expect(createdJob.payload).to.deep.equal({foo: 'bar'});
        });

        it('should throw', function () {
            expect(function () {
                job.createPersistenceJob();
            }).to.throw();
        });
    });

    describe('MailJob', function () {
        var mailJob, MailJob;

        before(function () {
            MailJob = require('../../lib/backend/MailJob');
            mailJob = new MailJob('fromFoo', 'toFoo', 'subjectFoo', 'templateFoo', {data: 'foo'});
        });

        it('should return the correct Job', function () {
            var createdJob = mailJob.createPersistenceJob().toJSON();

            expect(createdJob.type).to.equal('mail');
            expect(createdJob.payload).to.deep.equal({
                to: 'toFoo',
                from: 'fromFoo',
                subject: 'subjectFoo',
                template: 'templateFoo',
                data: {
                    data: 'foo'
                }
            });
        });

        it('should return the correct Job from payload', function () {
            var createdJob = MailJob.fromPayload({
                to: 'toFoo', from: 'fromFoo', subject: 'subjectFoo', template: 'templateFoo', data: {data: 'foo'}
            }).createPersistenceJob().toJSON();

            expect(createdJob.type).to.equal('mail');
            expect(createdJob.payload).to.deep.equal({
                to: 'toFoo',
                from: 'fromFoo',
                subject: 'subjectFoo',
                template: 'templateFoo',
                data: {
                    data: 'foo'
                }
            });
        });
    });
});