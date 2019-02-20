
(function ($) {

    var self = {
        nicoleseImg: [
            'https://scontent-gru2-1.cdninstagram.com/vp/0fed799d2c5541e115d0ba3b6fd09eea/5D2482A0/t51.2885-15/e35/27578934_728977360643396_1447335701656895488_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com',
            'https://scontent-gru2-1.cdninstagram.com/vp/141b82231a5084fee1a46eadd5223221/5D1F5C56/t51.2885-15/e35/26866680_981191675368372_5822511919931588608_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com',
            'https://scontent-gru2-1.cdninstagram.com/vp/04079ba27eeb1abb412c53ece7fda105/5CE5E2FF/t51.2885-15/e35/45485410_266470127350157_7088706291218423260_n.jpg?_nc_ht=scontent-gru2-1.cdninstagram.com',
            'https://scontent.frao1-1.fna.fbcdn.net/v/t1.0-9/13770500_1097328046994070_4296875737364206042_n.jpg?_nc_cat=108&_nc_ht=scontent.frao1-1.fna&oh=25cf7803ac763b332f205763ee2c0532&oe=5CE7EDD6',
            'https://scontent.frao1-2.fna.fbcdn.net/v/t1.0-9/42044985_1959503804109819_2746370447485435904_n.jpg?_nc_cat=102&_nc_ht=scontent.frao1-2.fna&oh=db673dcfb5e922ecb14a973b587df3c3&oe=5CF3075D',
            'https://scontent.frao1-1.fna.fbcdn.net/v/t1.0-9/25660384_1621099641283572_4923583772615692642_n.jpg?_nc_cat=111&_nc_ht=scontent.frao1-1.fna&oh=e866d0eb13ae74dfa9d351cf4b2fa1f1&oe=5D22488A',
            'https://scontent.frao1-2.fna.fbcdn.net/v/t1.0-9/37061172_1856941571032710_3987966366576541696_n.jpg?_nc_cat=103&_nc_ht=scontent.frao1-2.fna&oh=fee1ee44059ac87dabc2d239a989eb6c&oe=5CF6C4FB',
            'https://scontent.frao1-1.fna.fbcdn.net/v/t1.0-9/36315577_1831614976898703_2231289459356205056_n.jpg?_nc_cat=107&_nc_ht=scontent.frao1-1.fna&oh=ddebeddf7a265e2209ad3b9d27d966cd&oe=5D228D89',
            'https://scontent.frao1-1.fna.fbcdn.net/v/t1.0-9/22780620_1561256073934596_6147953846793773094_n.jpg?_nc_cat=109&_nc_ht=scontent.frao1-1.fna&oh=e8d12c51ece8144380ab36aca8162862&oe=5CEDAB10',
        ],
        handleImages: function (lstImgs, time) {
            $.each($('img'), function (i, item) {
                //Skip if image is already replaced
                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                    var h = $(item).height();
                    var w = $(item).width();

                    //If image loaded
                    if (h > 0 && w > 0) {
                        self.handleImg(item, lstImgs);
                    }
                    else {
                        //Replace when loaded
                        $(item).load(function () {
                            //Prevent 'infinite' loop
                            if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                self.handleImg(item, lstImgs);
                            }
                        });
                    }
                }
            });

            //Keep replacing
            if (time > 0) {
                setTimeout(function () { self.handleImages(lstImgs, time); }, time);
            }
        },
        handleImg: function (item, lstImgs) {
            $(item).error(function () {
                //Handle broken imgs
                self.handleBrokenImg(item, lstImgs);
            });

            self.setRandomImg(item, lstImgs);
        },
        setRandomImg: function (item, lstImgs) {
            var h = $(item).height();
            var w = $(item).width();
            $(item).css('width', w + 'px').css('height', h + 'px');
            $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
        },
        handleBrokenImg: function (item, lstImgs) {

            var brokenImg = $(item).attr('src');
            var index = lstImgs.indexOf(brokenImg);
            if (index > -1) {
                lstImgs.splice(index, 1);
            }
            self.setRandomImg(item, lstImgs);
        },
    };

    //Run on jQuery ready
    $(function () {
        self.handleImages(self.nicoleseImg, 3000);
    });

    //Set global variable
    $.nCage = self;

})(jQuery);
