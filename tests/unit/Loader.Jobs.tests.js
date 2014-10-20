var mockgoose = require('mockgoose');
var expect = require('chai').use(require('sinon-chai')).expect;
var sinon = require('sinon');

var mocks = require('../util/mocks');

describe('JobLoader', function () {
    var JobLoader;

    before(function (done) {
        JobLoader = require('../../').loader.JobLoader;

        require('../util/dbPrepare.threeJobs')(done);
    });

    after(function () {
        mockgoose.reset();
    });

    describe('latestJobs', function () {
        var error, jobs;

        before(function (done) {
            (new JobLoader()).loadJobsSinceDate(new Date(2014, 1, 28), function (_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(2);
        });
    });

    describe('latestJobsByType', function () {
        var error, jobs;

        before(function (done) {
            (new JobLoader()).loadJobsByTypeSinceDate('fooType', new Date(2014, 5, 1), function (_error, _jobs) {
                error = _error;
                jobs = _jobs;
                done();
            });
        });

        it('should load the latest wishes since date', function () {
            expect(error).to.be.null;
            expect(jobs.length).to.equal(1);
            expect(jobs[0].type).to.equal('fooType');
        });
    })
});