const EXIT_BANNER = 'Exiting...'

export const shutdownApp = () => {
    console.log(EXIT_BANNER)

    process.exit()
}