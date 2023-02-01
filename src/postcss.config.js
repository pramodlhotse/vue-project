const algacss = required('alga-css')
module.exports = {
    plugins: [
        algacss({
            extract: './src/**/*.vue'
        })
    ]
}
