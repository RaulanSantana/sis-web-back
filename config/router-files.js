const filenames = {
    'routes': [
        // 'post-resource',
        // 'reply-resource',
        'reservas_a'
    ]
};

function toRelativePaths(folder) {
    return filename => {
        // console.log(`../src/module/${folder}/${filename}`)
        return `../${folder}/${filename}`;
    };
}

function toFileList(imports, folder) {
    return [
        ...imports,
        ...filenames[folder].map(toRelativePaths(folder))
    ];
}

module.exports = Object.keys(filenames).reduce(toFileList, []);
