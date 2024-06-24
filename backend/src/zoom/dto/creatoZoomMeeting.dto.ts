export interface ZoomMeetingDto {
    topic : string,
    agenda : string,
    start_time : string
    duration : number
    meeting_invites : string[]
}

export interface ZoomSettings {
    host_video: boolean,
    participant_video: boolean,
    join_before_host: boolean,
    mute_upon_entry: boolean,
    watermark: boolean,
    use_pmi: boolean,
    approval_type: 0,
    audio: 'both',
    auto_recording: 'none',
    meeting_invites: any
}