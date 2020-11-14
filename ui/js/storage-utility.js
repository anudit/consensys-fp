let space;

async function storeFile(_hash){
    let prevFiles = await space.private.get('files');
    console.log(prevFiles);

    if (Boolean(prevFiles) === true){
        prevFiles.push(_hash);
    }
    else{
        prevFiles = [_hash];
    }

    console.log(prevFiles);
    await space.private.set('files', prevFiles)
}

async function setup3Box(_provider){
    let promise = new Promise(async (res, rej) => {

        try {
            console.log('Setting up 3box');
            let box=  await Box.create(_provider);
            await box.syncDone;
            document.querySelector('#tasksTitle').innerText = 'Decrypting Files.';
            await box.auth(['saarthi'], { address:_provider.selectedAddress });
            space = await box.openSpace('saarthi');
            await space.syncDone;
            console.log('All done');
            res(space);

        } catch (error) {
            console.log('Got Error');
            console.log(error);
            rej(error);
        }

    });
    let result = await promise;
    return result;
}
