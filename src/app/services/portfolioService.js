import $ from 'jquery';

let portfolioSrc = '_config/portfolio.xml';
if (process.env.__DEV__) {
    portfolioSrc = 'testConfig/portfolio.xml';
}

export default {

    // parse xml format:
    fetchPortfolio () {
        return new Promise((resolve, reject) => {
            $.ajax({
                dataType: 'xml',
                url: portfolioSrc+'?cacheBust='+Date.now(),
                success: (response) => {
                    let portfolio = [];
                    $(response).find('project').each((index, projectXml) => {
                        
                        //
                        let project = {
                            title: $(projectXml).attr('title'),
                            thumb: $(projectXml).attr('thumbnail'),
                            rows: [],
                            imageCache: []
                        };

                        $(projectXml).children('row').each((index, rowXml) => {
                            let row = {
                                cols: []
                            };
             
                            $(rowXml).children().each((index, colXml) => {
                                
                                let col = {
                                    width: $(colXml).attr('width'),
                                };

                                if (colXml.nodeName === 'image') {
                                    let src = $(colXml).attr('src');
                                    if (src) {
                                        col.bgImageSrc = $(colXml).attr('src');
                                        project.imageCache.push(col.bgImageSrc);
                                    } else {
                                        col.bgImageSrc = [];
                                        $(colXml).children().each((index, imgSourceXml) => {
                                            let minWidth = parseInt($(imgSourceXml).attr('minWidth'), 10) || 0;
                                            let src = {
                                                src: $(imgSourceXml).attr('src'),
                                                minWidth: minWidth,
                                            };
                                            col.bgImageSrc.push(src);
                                        });
                                        project.imageCache.push(col.bgImageSrc);
                                    }
                                }

                                else if (colXml.nodeName === 'paragraph') {

                                    col.title = $(colXml).attr('title');
                                    col.text = $(colXml).html();
                                    col.class = $(colXml).attr('class');
                                }

                                row.cols.push(col);

                            });

                            project.rows.push(row);
                        });

                        portfolio.push(project);
                        
                    });
                    resolve({
                        portfolio: portfolio
                    });
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject({
                        error: jqXHR.responseText
                    });
                }
            });
        });
    }

};
