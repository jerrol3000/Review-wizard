const fs = require('fs');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

// Generate mock reviews
const generateReviews = (userCount = 50, reviewsPerUser = 3) => {
  const reviews = [];
  const platforms = ['Google', 'Yelp', 'Facebook', 'Manual Import'];
  const sentimentMap = {
    Positive: { min: 0.7, max: 1 },
    Neutral: { min: -0.3, max: 0.6 },
    Negative: { min: -1, max: -0.4 }
  };

  for (let i = 0; i < userCount; i++) {
    const user = {
      userId: uuidv4(),
      userName: faker.person.fullName(),
      businessType: faker.helpers.arrayElement(['Restaurant', 'Retail', 'Service', 'Freelancer'])
    };

    for (let j = 0; j < reviewsPerUser; j++) {
      const rating = faker.number.int({ min: 1, max: 5 });
      const date = moment(faker.date.between({ from: '2023-01-01', to: '2024-01-01' })).format();

      // Generate realistic sentiment based on rating
      let sentimentCategory, sentimentScore;
      if (rating >= 4) {
        sentimentCategory = 'Positive';
        sentimentScore = faker.number.float({ min: sentimentMap.Positive.min, max: sentimentMap.Positive.max });
      } else if (rating === 3) {
        sentimentCategory = 'Neutral';
        sentimentScore = faker.number.float({ min: sentimentMap.Neutral.min, max: sentimentMap.Neutral.max });
      } else {
        sentimentCategory = 'Negative';
        sentimentScore = faker.number.float({ min: sentimentMap.Negative.min, max: sentimentMap.Negative.max });
      }

      reviews.push({
        reviewId: uuidv4(),
        userId: user.userId,
        businessName: `${user.userName}'s ${user.businessType}`,
        reviewerName: faker.person.fullName(),
        platform: faker.helpers.arrayElement(platforms),
        date: date,
        rating: rating,
        reviewText: generateReviewText(rating, user.businessType),
        sentimentScore: sentimentScore,
        sentimentCategory: sentimentCategory,
        responseStatus: faker.helpers.arrayElement(['Responded', 'Pending', 'Ignored']),
        verifiedPurchase: faker.datatype.boolean()
      });
    }
  }
  return reviews;
};

// Generate realistic review text based on rating and business type
const generateReviewText = (rating, businessType) => {
  const positivePhrases = [
    `Excellent service! Will definitely return to this ${businessType} again.`,
    `Outstanding experience! The best ${businessType} in town.`,
    `Highly recommend! Everything was perfect.`
  ];

  const neutralPhrases = [
    `Decent ${businessType}, but room for improvement.`,
    `Average experience. Nothing special but not terrible.`,
    `Met basic expectations but didn't wow me.`
  ];

  const negativePhrases = [
    `Very disappointing experience at this ${businessType}.`,
    `Would not recommend. Poor service quality.`,
    `Terrible experience - needs serious improvement.`
  ];

  const phrases = rating >= 4 ? positivePhrases :
                 rating === 3 ? neutralPhrases :
                 negativePhrases;

  return faker.helpers.arrayElement(phrases) + ' ' + faker.lorem.sentence();
};

// Generate dashboard metrics
const generateMetrics = (reviews) => {
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;
  const sentimentDistribution = reviews.reduce((acc, r) => {
    acc[r.sentimentCategory] = (acc[r.sentimentCategory] || 0) + 1;
    return acc;
  }, {});

  return {
    totalReviews,
    averageRating: parseFloat(averageRating.toFixed(1)),
    averageSentiment: parseFloat((
      reviews.reduce((sum, r) => sum + r.sentimentScore, 0) / totalReviews
    ).toFixed(2)),
    sentimentDistribution,
    responseRate: parseFloat((
      reviews.filter(r => r.responseStatus === 'Responded').length / totalReviews * 100
    ).toFixed(1)),
    platformDistribution: reviews.reduce((acc, r) => {
      acc[r.platform] = (acc[r.platform] || 0) + 1;
      return acc;
    }, {})
  };
};

// Generate and save sample data
const generateSeedData = () => {
  const reviews = generateReviews();
  const metrics = generateMetrics(reviews);

  const data = {
    metadata: {
      generatedAt: new Date().toISOString(),
      recordCount: reviews.length,
      dataVersion: '1.0'
    },
    metrics,
    reviews,
    pagination: {
      nextPage: null,
      prevPage: null,
      totalPages: 1
    }
  };

  // Save as JSON
  fs.writeFileSync('seed_data.json', JSON.stringify(data, null, 2));

  // Save as CSV for manual import
  const csvHeader = Object.keys(reviews[0]).join(',');
  const csvRows = reviews.map(r => Object.values(r).join(','));
  fs.writeFileSync('seed_data.csv', [csvHeader, ...csvRows].join('\n'));

  console.log(`Generated ${reviews.length} reviews with metrics`);
};

generateSeedData();
