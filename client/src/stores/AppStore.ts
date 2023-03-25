import { Device, Call } from "@twilio/voice-sdk";
import { observable, action, computed } from "mobx";

export class AppStore {
    @observable
    twilioToken?: string;

    @observable
    twilioDevice?: Device;

    @observable
    twilioIncomingPhoneNo?: string;

    @computed
    get hasCall() {
        return !!this.twilioIncomingPhoneNo;
    }

    @action
    setupTwilioDevice(token: string) {
        this.twilioToken = token;
        this.twilioDevice = new Device(token);
        // event listeners
        this.twilioDevice.on('registered', () => {
            console.log('successfully registered twilio device');
        })
        this.twilioDevice.on('error', (twilioError: any, call: Call) => {
            console.error({ twilioError, call });
        })
        this.twilioDevice.on('incoming', (call: Call) => {
            // accept incoming call

            // 1) get flow sid?
            // 2) get caller ID from Call.paramteres map

            // const incomingNumber = ...
            // const incomingMessage = `Incoming call from ${incomingNumber}`;
            // this.twilioIncomingPhoneNo = incomingNumber;

            // invoke a modal (Ok/cancel modal)

            // await the result

            // if accepted,
            call.accept();
        })
        this.twilioDevice.register();
    }

    @action
    init() {
        console.log('init');
        // call api to get twilio token
        // then call set up twilio device
        // this.setupTwilioDevice();
    }
}