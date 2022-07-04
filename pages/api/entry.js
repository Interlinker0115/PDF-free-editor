import { publish, createRecord, updateRecord, buildBlock } from 'utils/server/dato';

export default async (req, res) => {
    let result = { success: false, data: {} };

    if (req.method === 'POST') {
        let { coverimage, coauthors, monograph, attachments, ...rest } = req.body;

        let entry = {
            ...rest,
            itemType: process.env.ENTRY_MODEL_ID,
        };

        entry.coverimage = coverimage ? { uploadId: coverimage } : null;
        entry.monograph = monograph ? { uploadId: monograph } : null;

        // TEMP
        entry.coauthors = [coauthors];

        if (attachments) {
            if (!Array.isArray(attachments)) attachments = [attachments];
            entry.attachments = attachments.map(file => ({ uploadId: file }))
        }

        const record = await createRecord(entry);

        if (!record.error) {
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    } else if (req.method === 'PUT') {
        let { id, author = null, course, coverimage, coauthors, monograph, attachments, ...rest } = req.body;

        rest.coverimage = coverimage ? { uploadId: coverimage.id } : null;
        rest.monograph = monograph ? { uploadId: monograph.id } : null;
        rest.author = author.id;
        rest.course = course.id;

        // TEMP
        rest.coauthors = coauthors[0]?.id ? [coauthors[0]?.id] : coauthors;

        if (attachments) {
            if (!Array.isArray(attachments)) attachments = [attachments];
            rest.attachments = attachments.map(file => ({ uploadId: file.id }))
        }

        console.log('OVER HERE!!!', rest);
        const record = await updateRecord(id, rest);

        if (!record.error) {
            await publish(record.id);
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    }

    res.json(result);
};
