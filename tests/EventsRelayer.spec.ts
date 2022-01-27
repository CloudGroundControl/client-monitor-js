import { EventsRelayer } from "../src/EventsRelayer";

describe("Connect to a server", () => {
    it('EventsRelayer is constructed without error', () => {
        EventsRelayer.create();
    });
    it('Relay SampleCreated if subscribed', done => {
        const events = EventsRelayer.create();
        events.onSampleCreated(() => {
            done();
        });
        events.emitSampleCreated({
            clientId: "notImportant",
            timestamp: Date.now(),
        });
    });

    it('Not Relay SampleCreated if unsubscribed', done => {
        const events = EventsRelayer.create();
        const listener = (clientSample: any) => {
            throw new Error(`Should not be called`);
        };
        const doneListener = () => {
            done();
        }
        events.onSampleCreated(listener);
        events.onSampleCreated(doneListener);
        events.offSampleCreated(listener);
        events.emitSampleCreated({
            clientId: "notImportant",
            timestamp: Date.now(),
        });
    });

    it('Relay StatsCollected if subscribed', done => {
        const events = EventsRelayer.create();
        events.onStatsCollected(() => {
            done();
        });
        events.emitStatsCollected();
    });

    it('Not Relay StatsCollected if unsubscribed', done => {
        const events = EventsRelayer.create();
        const listener = () => {
            throw new Error(`Should not be called`)
        };
        const doneListener = () => {
            done();
        }
        events.onStatsCollected(listener);
        events.onStatsCollected(doneListener);
        events.offStatsCollected(listener);
        events.emitStatsCollected();
    });
});
