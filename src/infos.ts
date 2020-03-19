export class WeatherInfos {
    public city = 'N/A'
    public temperature = 0
    public humidity = 0
    public pressure = 0

    constructor(city?: string, temperature?: number, humidity?: number, pressure?: number) {
        this.city = city || 'N/C'
        this.temperature = temperature || 0
        this.humidity = humidity || 0
        this.pressure = pressure || 0
    }
}