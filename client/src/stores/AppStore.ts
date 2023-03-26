import { Device, Call } from "@twilio/voice-sdk";
import { observable, action, computed } from "mobx";
import { getTwilioToken } from "../api";

export class AppStore {
    @observable
    twilioToken?: string;

    @observable
    twilioDevice?: Device;

    @observable
    currentCall?: Call;

    @computed
    get twilioIncomingPhoneNo() {
        return this.currentCall?.parameters?.From;
    }

    @computed
    get hasCall() {
        return !!this.twilioIncomingPhoneNo;
    }

    @action
    resetCurrentCall() {
        this.currentCall = undefined;
    }

    @action
    setupTwilioDevice(token: string, { open, close }: {open: () => void, close: () => void}) {
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
            // 1) get flow sid?
            // 2) get caller ID from Call.paramteres map
            this.currentCall = call;

            call.on('cancel', () => {
                this.resetCurrentCall();
                close();
            });
            call.on('disconnect', () => {
                this.resetCurrentCall();
                close();
            });

            // invoke a confirmation modal
            open();
        })
        this.twilioDevice.register();
    }

    @action
    async init({ open, close }: {open: () => void, close: () => void}) {
        // call api to get twilio token
        const token = await getTwilioToken();
        if (token) this.setupTwilioDevice(token, { open, close });
    }

    @action
    acceptCall(close: () => void) {
        if (!this.currentCall) return;
        this.currentCall.accept();
        close();
    }

    @action
    rejectCall(close: () => void) {
        if (!this.currentCall) return;
        this.currentCall.reject();
        this.resetCurrentCall();
        close();
    }
}